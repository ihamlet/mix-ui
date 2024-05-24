export const filterEmptyValues = <T>(obj: T): Partial<T> => {
    return Object.fromEntries(
        Object.entries(obj as {}).filter(([_, value]) => value != null)
    ) as Partial<T>
}