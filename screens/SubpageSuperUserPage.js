import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SuperUserPage() {
    const [logContent, setLogContent] = useState('');  // State to store the file content

    useEffect(() => {
        // Fetch the file content when the component mounts
        axios.get('https://1941.methinks.pl/log.php')
             .then(response => {
                 setLogContent(response.data);  // Set the file content to the state
             })
             .catch(error => {
                 console.error("Error fetching log.txt:", error);
             });
    }, []);  // The empty dependency array ensures this useEffect runs once when the component mounts

    return (
        <div>
            <h1>This is the log of commits</h1>

            



            <div>
                {
                    // Split the content by <br> and map through it
                    logContent.split('<br>').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    );
}

export default SuperUserPage;
