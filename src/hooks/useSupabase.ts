import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Hook para inspeções
export const useInspecoes = () => {
  return useQuery({
    queryKey: ['inspecoes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inspecoes')
        .select(`
          *,
          inspecao_itens (*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

// Hook para criar inspeção
export const useCreateInspecao = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (inspecao: any) => {
      const { data, error } = await supabase
        .from('inspecoes')
        .insert(inspecao)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspecoes'] });
      toast({
        title: "Inspeção criada",
        description: "Inspeção criada com sucesso!",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao criar inspeção: " + error.message,
        variant: "destructive",
      });
    },
  });
};

// Hook para RNCs
export const useRNCs = () => {
  return useQuery({
    queryKey: ['rnc'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rnc')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

// Hook para criar RNC
export const useCreateRNC = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (rnc: any) => {
      const { data, error } = await supabase
        .from('rnc')
        .insert(rnc)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rnc'] });
      toast({
        title: "RNC criada",
        description: "RNC criada com sucesso!",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao criar RNC: " + error.message,
        variant: "destructive",
      });
    },
  });
};

// Hook para OS Ferramentaria
export const useOSFerramentaria = () => {
  return useQuery({
    queryKey: ['os_ferramentaria'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('os_ferramentaria')
        .select(`
          *,
          os_interacoes (*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

// Hook para criar OS
export const useCreateOS = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (os: any) => {
      const { data, error } = await supabase
        .from('os_ferramentaria')
        .insert(os)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['os_ferramentaria'] });
      toast({
        title: "OS criada",
        description: "Ordem de Serviço criada com sucesso!",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao criar OS: " + error.message,
        variant: "destructive",
      });
    },
  });
};

// Hook para mensagens do chat
export const useChatMensagens = () => {
  return useQuery({
    queryKey: ['chat_mensagens'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_mensagens')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });
};

// Hook para criar mensagem no chat
export const useCreateChatMensagem = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (mensagem: any) => {
      const { data, error } = await supabase
        .from('chat_mensagens')
        .insert(mensagem)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat_mensagens'] });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao enviar mensagem: " + error.message,
        variant: "destructive",
      });
    },
  });
};

// Hook para upload de imagens
export const useUploadImage = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ file, bucket, fileName }: { file: File; bucket: string; fileName: string }) => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      return { ...data, publicUrl };
    },
    onError: (error) => {
      toast({
        title: "Erro no upload",
        description: "Erro ao fazer upload da imagem: " + error.message,
        variant: "destructive",
      });
    },
  });
};