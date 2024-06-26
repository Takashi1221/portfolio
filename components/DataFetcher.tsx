import React, { useEffect, useState } from 'react';
import csv from 'csvtojson';

interface DataFetcherProps {
    children: (data: any[], source: string) => React.ReactNode;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ children }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [source, setSource] = useState<string | null>(null);

    const getFileName = () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const formatDate = (date: Date, forFileName: boolean = true) => {
            const year = date.getFullYear();
            const month = (`0${date.getMonth() + 1}`).slice(-2); // 月は0から始まるため+1
            const monthSource = (`0${date.getMonth() + 1}`).slice(-1);
            const day = (`0${date.getDate()}`).slice(-2);
            const daySource = (`0${date.getDate() -1}`).slice(-2);
            return forFileName ? `${year}${month}${day}.csv` : `${monthSource}/${daySource}`;
        };

        const todayFileName = formatDate(today);
        const yesterdayFileName = formatDate(yesterday);

        return [todayFileName, yesterdayFileName, formatDate(today, false), formatDate(yesterday, false)];
    };

    useEffect(() => {
        const fetchData = async () => {
            const [todayFileName, yesterdayFileName, todayFormatted, yesterdayFormatted] = getFileName();

            const fetchFile = async (fileName: string) => {
                const url = `https://scrape-portfolio.s3.eu-central-1.amazonaws.com/${fileName}`;
        
                try {
                    const response = await fetch(url);
                    if (response.ok) {
                        const csvData = await response.text();
                        const jsonData = await csv().fromString(csvData);
                        setData(jsonData);
                        setLoading(false);
                        return { success: true, source: fileName.includes(todayFileName) ? todayFormatted : yesterdayFormatted };
                    } else {
                        console.error(`Error fetching data from URL ${url}: ${response.statusText}`);
                        return { success: false, source: '' };
                    }
                } catch (error) {
                    console.error(`Error fetching data from URL ${url}:`, error);
                    return { success: false, source: '' };
                }
            };

            // 今日の日付のファイルをまず試す
            let result = await fetchFile(todayFileName);

            // 今日のファイルがなければ昨日の日付のファイルを試す
            if (!result.success) {
            await fetchFile(yesterdayFileName);
            }

            setSource(result.source);
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return <>{source && children(data, source)}</>;
};

export default DataFetcher;