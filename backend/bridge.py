import psutil

class CEngineBridge:
    def __init__(self):
        # Fetch initial CPU percent call to calibrate measurement intervals
        psutil.cpu_percent(interval=None)

    def read_all_metrics(self):
        # Read real CPU percentage across all cores
        cpu_load = psutil.cpu_percent(interval=None)
        
        # Read total used RAM in Megabytes
        ram_usage = int(psutil.virtual_memory().used / (1024 * 1024))
        
        # Estimate CPU temperature (fall back gracefully on platforms without hardware temp sensors)
        temp = 45.0
        if hasattr(psutil, "sensors_temperatures"):
            temps = psutil.sensors_temperatures()
            if temps:
                for name, entries in temps.items():
                    if entries:
                        temp = entries[0].current
                        break

        return {
            "cpu_load": cpu_load,
            "ram_usage": ram_usage,
            "temperature": round(temp, 2)
        }