const MAX_DATA_POINTS = 15;

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
                fill: true,
                yAxisID: 'y'
            },
            {
                label: 'System Temp (°C)',
                data: [],
                borderColor: '#f43f5e',
                backgroundColor: 'rgba(244, 63, 94, 0.2)',
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                yAxisID: 'y'
            },
            {
                label: 'RAM Usage (GB)',
                data: [],
                borderColor: '#a855f7',
                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                yAxisID: 'y1'
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
                type: 'linear',
                display: true,
                position: 'left',
                min: 0,
                max: 100,
                grid: { color: '#334155' },
                ticks: { color: '#94a3b8' },
                title: { display: true, text: '% / °C', color: '#94a3b8' }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: { drawOnChartArea: false },
                ticks: { color: '#a855f7' },
                title: { display: true, text: 'RAM (GB)', color: '#a855f7' }
            }
        },
        plugins: {
            legend: {
                labels: { color: '#f8fafc' }
            }
        }
    }
});

async function fetchMetrics() {
    try {
        const res = await fetch('/api/metrics');
        const data = await res.json();
        
        const cpuCard = document.getElementById('cpu-val');
        cpuCard.innerText = `${data.cpu_load} %`;
        document.getElementById('ram-val').innerText = `${data.ram_usage} MB`;
        document.getElementById('temp-val').innerText = `${data.temperature} °C`;

        if (data.cpu_load > 80) {
            cpuCard.style.color = '#ef4444';
        } else {
            cpuCard.style.color = '#38bdf8';
        }

        const timeLabel = new Date().toLocaleTimeString();
        const ramInGB = (data.ram_usage / 1024).toFixed(2);

        metricsChart.data.labels.push(timeLabel);
        metricsChart.data.datasets[0].data.push(data.cpu_load);
        metricsChart.data.datasets[1].data.push(data.temperature);
        metricsChart.data.datasets[2].data.push(ramInGB);

        if (metricsChart.data.labels.length > MAX_DATA_POINTS) {
            metricsChart.data.labels.shift();
            metricsChart.data.datasets[0].data.shift();
            metricsChart.data.datasets[1].data.shift();
            metricsChart.data.datasets[2].data.shift();
        }

        metricsChart.update();
    } catch (err) {
        console.error("Failed to fetch hardware metrics:", err);
    }
}

setInterval(fetchMetrics, 1000);
fetchMetrics();