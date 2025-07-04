#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: maximum <num1> <num2>\n");
        return 1;
    }

    double a = atof(argv[1]);
    double b = atof(argv[2]);
    printf("%f\n", (a > b) ? a : b);
    return 0;
}
