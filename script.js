
document.addEventListener("DOMContentLoaded", function() {
            // Dynamically generate 4 rows and 8 columns
            var tableBody = document.querySelector("tbody");
            for (var i = 0; i < 4; i++) {
                var row = document.createElement("tr");
                for (var j = 0; j < 8; j++) {
                    var cell = document.createElement("td");
                    // Check if it's the second, third, or fourth column (Test input) and create input for all rows
                    if (j >= 1 && j <= 3) {
                        var input = document.createElement("input");
                        input.type = "number";
                        input.id = "input_" + (i + 1) + "_" + j;
                        cell.appendChild(input);
                    }
                    // Check if it's the fifth column (Expected Output) and create dropdown menu for all rows
                    else if (j === 4) {
                        var select = document.createElement("select");
                        select.id = "dropdown_menu_" + (i + 1);
                        var options = ["Not a Triangle", "Equilateral Triangle", "Isosceles Triangle", "Scalene Triangle"];
                        options.forEach(function(optionText) {
                            var option = document.createElement("option");
                            option.value = optionText;
                            option.textContent = optionText;
                            select.appendChild(option);
                        });
                        cell.appendChild(select);
                    }
                    // Set default value "123456" for cells in the first column (Test ID)
                    else if (j === 0) {
                        cell.textContent = i + 1;
                    }
                    row.appendChild(cell);
                }
                tableBody.appendChild(row);
            }

            // Event listener for the "Test" button
            var testButton = document.getElementById("test_button");
            testButton.addEventListener("click", function() {
                // Loop through each row
                var rows = document.querySelectorAll("tbody tr");
                rows.forEach(function(row) {
                    // Get the input values from the row
                    var input1 = parseFloat(row.querySelector("td:nth-child(2) input").value);
                    var input2 = parseFloat(row.querySelector("td:nth-child(3) input").value);
                    var input3 = parseFloat(row.querySelector("td:nth-child(4) input").value);

                    // Check if any input is not a number or is 0
                    if (isNaN(input1) || isNaN(input2) || isNaN(input3) || input1 === 0 || input2 === 0 || input3 === 0) {
                        row.querySelector("td:nth-child(6)").textContent = "Not a Triangle";
                        row.querySelector("td:nth-child(7)").textContent = "Fail";
                        row.querySelector("td:nth-child(8)").textContent = "Inputs are invalid or contain 0.";
                        return; // Skip to the next row
                    }

                    // Check for Equilateral Triangle
                    if (input1 === input2 && input2 === input3) {
                        row.querySelector("td:nth-child(6)").textContent = "Equilateral Triangle";
                    }
                    // Check for Isosceles Triangle
                    else if (input1 === input2 || input2 === input3 || input1 === input3) {
                        row.querySelector("td:nth-child(6)").textContent = "Isosceles Triangle";
                    }
                    // Otherwise, it's Scalene Triangle
                    else {
                        row.querySelector("td:nth-child(6)").textContent = "Scalene Triangle";
                    }

                    // Compare Actual Output with Expected Output
                    var expectedOutput = row.querySelector("td:nth-child(5) select").value;
                    var actualOutput = row.querySelector("td:nth-child(6)").textContent;
                    if (actualOutput === expectedOutput) {
                        row.querySelector("td:nth-child(7)").textContent = "Pass";
                        row.querySelector("td:nth-child(8)").textContent = "NONE";
                    } else {
                        row.querySelector("td:nth-child(7)").textContent = "Fail";
                        row.querySelector("td:nth-child(8)").textContent = "Test failed. Expected: " + expectedOutput + ", Actual: " + actualOutput;
                    }
                });
            });

            // Event listener for the "Clear" button
            var clearButton = document.getElementById("clear_button");
            clearButton.addEventListener("click", function() {
                // Clear all input fields
                var inputs = document.querySelectorAll("input[type='number']");
                inputs.forEach(function(input) {
                    input.value = "";
                });

                // Clear all output fields
                var outputs = document.querySelectorAll("td:nth-child(6), td:nth-child(7), td:nth-child(8)");
                outputs.forEach(function(output) {
                    output.textContent = "";
                });
            });
        });