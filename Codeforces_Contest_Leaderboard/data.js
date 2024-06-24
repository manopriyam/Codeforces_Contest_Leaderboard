fetch(csvFileUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(csvData => {
        processData(csvData);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });


function processData(csvData) {
    const rows = csvData.split('\n');
    
    rows.forEach(row => {
        const columns = row.split(',');
        if (columns.length > handleCol) {
            const batch = columns[batchCol].trim();
            const handle = columns[handleCol].trim();
            if (handles.hasOwnProperty(batch)) {
                handles[batch].push(handle);
            }
        }
    });
}
