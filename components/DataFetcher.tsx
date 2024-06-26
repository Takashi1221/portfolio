import React, { useEffect, useState } from 'react';
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
            const [todayFileName, yesterdayFileName] = getFileName();

            const fetchFile = async (fileName: string) => {
                const url = `https://scrape-portfolio.s3.eu-central-1.amazonaws.com/${fileName}`;
        
                try {
                    const response = await fetch(url);
                    if (response.ok) {
                        const csvData = await response.text();
                        const jsonData = await csv().fromString(csvData);
                        setData(jsonData);
                        setLoading(false);
                        return true; // 成功したことを示すためにtrueを返す
                    } else {
                        console.error(`Error fetching data from URL ${url}: ${response.statusText}`);
                        return false; // 失敗したことを示すためにfalseを返す
                    }
                } catch (error) {
                    console.error(`Error fetching data from URL ${url}:`, error);
                    return false; // 失敗したことを示すためにfalseを返す
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