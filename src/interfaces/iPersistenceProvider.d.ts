interface IPersistenceProvider {
    read(id: string): Promise<WriteResponse>
    write(id: string, content: string): Promise<WriteResponse>
}