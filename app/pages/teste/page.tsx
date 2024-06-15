"use client"
import { useEffect, useState } from "react";
import { Users } from "@prisma/client";

export default function TestePage() {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <h1>Carregando</h1>;
  }

  return (
    <>
      oi
      {users.map((user, i) => (
        <div key={i}>
          {user.id}
          {user.name}
          {user.role}
        </div>
      ))}
    </>
  );
}
