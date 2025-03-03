const areaSelector = document.getElementById("areaSelector");
const chemSelector = document.getElementById("chemSelector");
const resultSelector = document.getElementById("resultSelector");
const strengthInput = document.getElementById("strengthInput");
const resultText = document.getElementById("resultText");

const areaSizes = { "mailbox": 488, "frontwest": 840, "frontnorth": 912, "drivewaynorth": 350, "drivewaysouth": 350, "trashcan": 195, "southdoggate": 195, "backeast": 942, "backnorth": 942, "northside": 200, "austinflowerbed": 80, "flagflowerbed": 200, "frontflowerbed": 120 };
const resultToIndex = ["verylow", "low", "mediumlow", "medium", "mediumhigh", "high", "veryhigh"];
const chemResultTable = { "nitrogen": [10, 8, 7, 6, 5, 4, 2], "phosphorous": [12, 10, 9, 8, 7, 6, 4], "potassium": [10, 8, 7, 6, 5, 4, 3] };

function getCalculation() {
    const area = areaSelector.value;
    const chemicalType = chemSelector.value;
    const result = resultSelector.value;
    const chemicalStrength = strengthInput.value;

    const areaSize = areaSizes[area];
    const tableReading = chemResultTable[chemicalType][resultToIndex.indexOf(result)];
    const calculation = calculatePoundsNeeded(areaSize, tableReading, chemicalStrength);
    resultText.innerHTML = calculation;
}

function calculatePoundsNeeded(areaSize, tableReading, chemicalStrength) {
    for (const value of [areaSize, tableReading, chemicalStrength]) {
        if (isNaN(value)) {
            return "N/A";
        }
    }
    if (chemicalStrength <= 0) {
        alert("Chemical Strength is an invalid number!");
        strengthInput.value = 1;
        return "N/A";
    }

    const calculation = areaSize * tableReading * 100 / 2000 / chemicalStrength;
    const fixed = calculation.toFixed(2);
    return fixed + "lbs";
}