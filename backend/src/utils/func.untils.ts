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

/**
 * Fetches transaction data for a given address from the Blockscout API.
 * 
 * @param address - The blockchain address for which to retrieve transactions.
 * @returns A promise that resolves to the JSON response containing transaction details,
 *          or returns the address in case of an error.
 */
export async function getTransactions(address: string) {
  try {
    return await fetch(`https://base.blockscout.com/api/v2/addresses/${address}/transactions?filter=to%20%7C%20from`, {
      method: "GET",
    }).then((res) => res.json());
  } catch (error) {
    return address;
  }
}

export async function searchTokens(query: string): Promise<any> {
  const url = `https://gnosis.blockscout.com/api/v2/search?q=${query}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error searching tokens:", error);
    throw error;
  }
}

export async function getABI(contractAddress: string): Promise<any> {
  try {
    const response = await fetch("https://base.blockscout.com/api/api?module=contract&action=getabi&address=" + contractAddress);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching ABI:", error);
    throw error;
  }
}