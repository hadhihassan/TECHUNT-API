function countProperties(obj) {
    let count = 0;

    // Function to recursively count properties
    function countRecursive(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                count++; // Increment count for each property found
                // If the value is an object, recursively count its properties
                if (typeof obj[key] === 'object') {
                    countRecursive(obj[key]);
                }
            }
        }
    }

    // Call the recursive function to count properties
    countRecursive(obj);
    console.log(count)
    const totalProperties = 20; // Assuming a total of 20 properties
    const completionPercentage = (count / totalProperties) * 100;
    return completionPercentage;
}


export default countProperties
