export function serializeBigInt(data: any): any {
  if (typeof data === 'bigint') {
    return data.toString();  // Convert BigInt to string
  }

  if (Array.isArray(data)) {
    return data.map(serializeBigInt); // Recursively handle arrays
  } else if (typeof data === 'object' && data !== null) {
    // Recursively handle objects
    const serializedObject: any = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        serializedObject[key] = serializeBigInt(data[key]);
      }
    }
    return serializedObject;
  }

  return data; // Return the value if it's not a BigInt, object, or array
}