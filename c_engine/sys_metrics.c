#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "sys_metrics.h"

// Initialize random seed
void init_engine() {
    srand((unsigned int)time(NULL));
}

// Simulated CPU load percentage (0 - 100%)
int get_cpu_load() {
    return rand() % 100;
}

// Simulated RAM usage in MB
int get_ram_usage() {
    return 2048 + (rand() % 4096);
}

// Simulated System Temperature in Celsius
float get_system_temp() {
    return 35.0f + ((float)rand() / RAND_MAX) * 45.0f;
}