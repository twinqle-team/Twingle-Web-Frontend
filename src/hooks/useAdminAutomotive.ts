import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AutoService } from '@/components/vendor/services/AutoService';
import { AdminAutomotives, AdminFilterState } from '@/components/admin/product/types/AdminAutomotives';


export function useAutomotive(filters?: AdminFilterState, page?: number, itemsPerPage?: number) {
  return useQuery({
    queryKey: ['automotives', filters, page, itemsPerPage],
    queryFn: () => AutoService.getAutomotives(filters, page, itemsPerPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAuto(id: string) {
  return useQuery({
    queryKey: ['auto', id],
    queryFn: () => AutoService.getAuto(id),
    enabled: !!id,
  });
}

export function useDeleteAuto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => AutoService.deleteAuto(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automotives'] });
    },
  });
}

export function useUpdateAuto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<AdminAutomotives> }) =>
      AutoService.updateAuto(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automotives'] });
    },
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => AutoService.toggleFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automotives'] });
    },
  });
}

export function useAutoStats() {
  return useQuery({
    queryKey: ['AutoStats'],
    queryFn: () => AutoService.getStats(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: () => AutoService.getCities(),
    staleTime: Infinity,
  });
}

export function useAutoTypes() {
  return useQuery({
    queryKey: ['autoTypes'],
    queryFn: () => AutoService.getAutoTypes(),
    staleTime: Infinity,
  });
}

export function useStatuses() {
  return useQuery({
    queryKey: ['statuses'],
    queryFn: () => AutoService.getStatuses(),
    staleTime: Infinity,
  });
}
