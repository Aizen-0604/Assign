async function calculate() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operation = document.querySelector('input[name="operation"]:checked');
    const resultField = document.getElementById("result");

    if (isNaN(num1) || isNaN(num2)) {
        resultField.textContent = "Please enter valid numbers.";
        return;
    }

    if (!operation) {
        resultField.textContent = "Please select an operation.";
        return;
    }

    try {
        const response = await fetch("http://172.17.15.7:3000/calculate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                num1,
                num2,
                operation: operation.value
            })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();
        resultField.textContent = `Result: ${data.result}`;
    } catch (error) {
        resultField.textContent = `Error: ${error.message}`;
    }
}
