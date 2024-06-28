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
            const day = (`0${date.getDate()}`).slice(-2);
            return forFileName ? `${year}${month}${day}.csv` : `${year}/${month}/${day}`;
        };

        const todayFileName = formatDate(today);
        const yesterdayFileName = formatDate(yesterday);

        return [todayFileName, yesterdayFileName, formatDate(today, false), formatDate(yesterday, false)];
    };

    useEffect(() => {
        const fetchData = async () => {
            const [todayFileName, yesterdayFileName, todayFormatted, yesterdayFormatted] = getFileName();

            const fetchFile = async (fileName: string, formattedDate: string) => {
                const url = `https://scrape-portfolio.s3.eu-central-1.amazonaws.com/${fileName}`;
        
                const response = await fetch(url);
                if (response.ok) {
                    const csvData = await response.text();
                    const jsonData = await csv().fromString(csvData);
                    setData(jsonData);
                    setSource(formattedDate);
                    setLoading(false);
                    return true;
                } else {
                    console.error(`Error fetching data from URL ${url}: ${response.statusText}`);
                    throw new Error(`Failed to fetch ${fileName}`);
                }
            };

            try {
                // 今日の日付のファイルをまず試す
                await fetchFile(todayFileName, todayFormatted);
            } catch (error) {
                console.error(error);
                try {
                    // 今日のファイルがなければ昨日の日付のファイルを試す
                    await fetchFile(yesterdayFileName, yesterdayFormatted);
                } catch (error) {
                    console.error(error);
                    setError('Failed to fetch data');
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return <>{source && children(data, source)}</>;
};

export default DataFetcher;