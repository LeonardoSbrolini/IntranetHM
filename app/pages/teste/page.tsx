"use client"
import React, { useEffect, useState } from 'react';

interface News {
    id: number;
    title: string;
    content: string;
}

const NewsList: React.FC = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/noticias');
                if (!response.ok) {
                    throw new Error('Erro ao buscar as notícias');
                }
                const data = await response.json();
                setNews(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>News List</h1>
            <pre>{JSON.stringify(news, null, 2)}</pre>
        </div>
    );
};

export default NewsList;
