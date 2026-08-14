import { useEffect, useState } from "react";

export const Private = () => {
    const [message, setMessage] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");

        console.log(token);
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMessage(data.message);
            });
    }, []);
    return (
        <div className="text-center mt-5">
            <h1>Private</h1>

            <img
                src={`https://picsum.photos/300/300?random=${Date.now()}`}
                alt="Random"
                className="rounded-circle shadow my-4"
                style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover"
                }}
            />

            <h3>{message}</h3>
        </div>
    );
};