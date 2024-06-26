import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import csv from 'csvtojson';

interface DataFetcherProps {
    children: (data: any[]) => React.ReactNode;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ children }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getFileName = () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const formatDate = (date: Date) => {
            const year = date.getFullYear();
            const month = (`0${date.getMonth() + 1}`).slice(-2); // 月は0から始まるため+1
            const day = (`0${date.getDate()}`).slice(-2);
            return `${year}${month}${day}.csv`;
        };

        const todayFileName = formatDate(today);
        const yesterdayFileName = formatDate(yesterday);

        return [todayFileName, yesterdayFileName];
    };

    useEffect(() => {
        const fetchData = async () => {
            // AWS SDKの設定
            AWS.config.update({
                region: 'eu-central-1',
                accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
            });

            const s3 = new AWS.S3();
            const [todayFileName, yesterdayFileName] = getFileName();

            const fetchFile = async (fileName: string) => {
                const params = {
                    Bucket: 'scrape-portfolio',
                    Key: fileName,
                };

                try {
                    const data = await s3.getObject(params).promise();
                    const csvData = data.Body.toString('utf-8');
                    const jsonData = await csv().fromString(csvData);
                    setData(jsonData);
                    setLoading(false);
                } catch (error) {
                    console.error(`Error fetching data from S3 for file ${fileName}:`, error);
                    return null;
                }
            };

            // 今日の日付のファイルをまず試す
            let result = await fetchFile(todayFileName);

            // 今日のファイルがなければ昨日の日付のファイルを試す
            if (!result) {
            await fetchFile(yesterdayFileName);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return <>{children(data)}</>;
};

export default DataFetcher;