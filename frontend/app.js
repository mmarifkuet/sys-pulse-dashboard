// Maximum number of data points visible on the graph
const MAX_DATA_POINTS = 15;

// Initialize Chart.js Line Chart
const ctx = document.getElementById('metricsChart').getContext('2d');
const metricsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'CPU Load (%)',
                data: [],
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.2)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            },
            {
                label: 'System Temp (°C)',
                data: [],
                borderColor: '#f43f5e',
                backgroundColor: 'rgba(244, 63, 94, 0.2)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                grid: { color: '#334155' },
                ticks: { color: '#94a3b8' }
            },
            y: {
                min: 0,
                max: 100,
                grid: { color: '#334155' },
                ticks: { color: '#94a3b8' }
            }
        },
        plugins: {
            legend: {
                labels: { color: '#f8fafc' }
            }
        }
    }
});

// Fetch metrics from Flask API and update the chart
async function fetchMetrics() {
    try {
        const res = await fetch('/api/metrics');
        const data = await res.json();
        
        // Update Card UI
        document.getElementById('cpu-val').innerText = `${data.cpu_load} %`;
        document.getElementById('ram-val').innerText = `${data.ram_usage} MB`;
        document.getElementById('temp-val').innerText = `${data.temperature} °C`;

        // Timestamp for X-axis
        const timeLabel = new Date().toLocaleTimeString();

        // Push new data into Chart
        metricsChart.data.labels.push(timeLabel);
        metricsChart.data.datasets[0].data.push(data.cpu_load);
        metricsChart.data.datasets[1].data.push(data.temperature);

        // Keep rolling window of MAX_DATA_POINTS
        if (metricsChart.data.labels.length > MAX_DATA_POINTS) {
            metricsChart.data.labels.shift();
            metricsChart.data.datasets[0].data.shift();
            metricsChart.data.datasets[1].data.shift();
        }

        metricsChart.update();
    } catch (err) {
        console.error("Failed to fetch hardware metrics:", err);
    }
}

// Poll backend every 1 second
setInterval(fetchMetrics, 1000);
fetchMetrics();