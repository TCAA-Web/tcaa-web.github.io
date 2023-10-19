export async function useFetch(url) {
    let data;
    let error;
    try {
        let result = await fetch(url)
        data = await result.json()
    }
    catch (err) {
        console.error(err)
        error = err
    }

    return {data, error}
}