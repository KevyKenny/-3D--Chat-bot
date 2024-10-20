import supabase from "../../supabase-client";

const assistanceSlice = (set, get) => ({
    loading: false,
    error: null,
    addDataset: async (payload) => {
        set({ loading: true });
        let { data: newDataset, error: errorDataset } = await supabase
            .from("documents")
            .insert(payload)
            .single()
            .select();
        if (errorDataset) {
            console.log("Error", errorDataset);
            set({ errorDataset });
            set({ loading: false });
            return null;
        };
        set({ loading: false });
        return newDataset;
    },
    matchContents:  async (payload) => {
        set({ loading: true });
        let { data: similarContents, error} = await supabase.rpc(
            "match_documents",
            {
                query_embedding: payload.embedding,
                match_threshold: 0.8,
                match_count: 10,
            }
        );
        if (error) {
            console.log("Error", error);
            set({ error });
            set({ loading: false });
            return null;
        }
        set({ loading: false });
        return similarContents;
    },
})

export default  assistanceSlice;