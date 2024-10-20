import supabase from "../../supabase-client";

const authSlice = (set, get) => ({
  profile: null,
  user: null,
  getUser: async () => {
    supabase.auth.onAuthStateChange((event, session) => {
      set({ loading: true });
      const fetchPublicUser = async (input_uuid_id) => {
        let { data, error } = await supabase
          .rpc("get_user_by_uuid", {
            input_uuid_id,
          })
          .single();
        if (error) {
          console.log(error);
        } else {
          set({ profile: data });
        }
      };
      set({ user: session?.user });
      switch (event) {
        case "SIGNED_IN":
          set({ authenticated: true });
          fetchPublicUser(session.user.id);
          break;

        case "SIGNED_OUT":
          set({ authenticated: false });
          set({ profile: null });
          break;
        case "TOKEN_REFRESHED":
          if (session) {
            set({ authenticated: true });
            fetchPublicUser(session.user.id);
          } else {
            set({ authenticated: false });
            set({ profile: null });
          }
          break;
        case "INITIAL_SESSION":
          if (session) {
            set({ authenticated: true, loading: false });
            fetchPublicUser(session.user.id);
          } else {
            set({ authenticated: false, loading: true });
            set({ profile: null });
          }
          break;

        case "USER_UPDATED":
          if (session) {
            set({ authenticated: true });
            fetchPublicUser(session.user.id);
          } else {
            set({ authenticated: false });
            set({ profile: null });
          }

        default:
          set({ authenticated: false });
          set({ profile: null });
          break;
      }
      set({ loading: false });
    });
  },

  createNewUser: async (payload) => {
    set({ loading: true });
    const updatedPayload = {
      ...payload,
      email: get().user.email,
      uuid: get().user.id,
    }
    console.log(updatedPayload);
    const { data, error } = await supabase
      .from("users")
      .insert(updatedPayload)
      .select()
      .single();
    if (error) {
      console.log("error", error);
      set({ error });
      set({ loading: false });
      return null;
    }
    if (data) {
      set({ profile: data });
      set({ loading: false });
      return data;
    }
    set({ loading: false });
  },

  signupWithEmail: async (email, password) => {
    set({ loading: true });
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.log("error", error);
      set({ error });
      set({ loading: false });
      return null;
    }
    if (user) {
      set({ user });
      set({ authenticated: true });
      set({ loading: false });
    }
    set({ loading: false });
  },
  loginWithEmail: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      set({ authenticated: false });
      return { error: error.message };
    }
    console.log(data);

    if (data) {
      const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("uuid", data.user.id)
        .single();

      set({ profile: user });
      set({ authenticated: true });
      console.log(user);
      return data;
    }
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error logging out", error);
    } else {
      set({ authenticated: false });
      set({ profile: null });
    }
  },
});

export default authSlice;
