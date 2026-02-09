import { create } from 'zustand'
import { supabase } from '../../lib/supabaseClient'

export const useAuthStore = create((set) => ({
  session: null,
  user: null,
  profile: null,
  loading: true,

  loadSession: async () => {
    set({ loading: true })
    const { data } = await supabase.auth.getSession()

    if (data.session) {
      const user = data.session.user

      set({
        session: data.session,
        user,
      })

      // 🔥 BUSCA O PROFILE AQUI MESMO
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Erro ao buscar profile:', error)
        console.error('Detalhes:', JSON.stringify(error, null, 2))
      } else {
        set({ profile })
      }
    } else {
      set({ session: null, user: null, profile: null })
    }
    set({ loading: false })
  },


  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error

    set({ session: data.session, user: data.user })

    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (profileError) {
        console.error('Erro ao buscar profile:', profileError)
        console.error('Detalhes:', JSON.stringify(profileError, null, 2))
      } else {
        set({ profile })
      }
    }
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ session: null, user: null, profile: null })
  },
}))
