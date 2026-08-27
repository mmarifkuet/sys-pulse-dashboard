async function fetchMetrics() {
    try {
        const res = await fetch('/api/metrics');
        const data = await res.json();
        
        document.getElementById('cpu-val').innerText = `${data.cpu_load} %`;
        document.getElementById('ram-val').innerText = `${data.ram_usage} MB`;
        document.getElementById('temp-val').innerText = `${data.temperature} °C`;
    } catch (err) {
        console.error("Failed to fetch hardware metrics:", err);
    }
}

setInterval(fetchMetrics, 1000);
fetchMetrics();