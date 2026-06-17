import { useState, useEffect } from "react";

function ServerNotice() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md">
                <h2 className="text-xl font-bold mb-3">
                    Backend Wake-Up Notice
                </h2>

                <p className="mb-4">
                    Note: This project uses Render's free tier. The backend may take
                    30–60 seconds to start after inactivity. If you encounter a <b> Network Error</b> during login,
                    please wait a moment and try signing in again.
                </p>

                <button
                    onClick={() => setShow(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default ServerNotice;