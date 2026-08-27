import random

class CEngineBridge:
    def __init__(self):
        # Simulated C Engine in Python for quick setup
        pass

    def read_all_metrics(self):
        return {
            "cpu_load": random.randint(10, 95),
            "ram_usage": random.randint(2048, 6144),
            "temperature": round(random.uniform(35.0, 75.0), 2)
        }