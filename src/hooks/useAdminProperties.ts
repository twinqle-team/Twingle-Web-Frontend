import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminFilterState, AdminProperty } from '@/components/admin/product/types/AdminProperty';
import { AdminPropertyService } from '@/components/admin/product/services/AdminPropertyservice';


export function useProperties(filters?: AdminFilterState, page?: number, itemsPerPage?: number) {
  return useQuery({
    queryKey: ['properties', filters, page, itemsPerPage],
    queryFn: () => AdminPropertyService.getProperties(filters, page, itemsPerPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => AdminPropertyService.getProperty(id),
    enabled: !!id,
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => AdminPropertyService.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<AdminProperty> }) =>
      AdminPropertyService.updateProperty(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => AdminPropertyService.toggleFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function usePropertyStats() {
  return useQuery({
    queryKey: ['propertyStats'],
    queryFn: () => AdminPropertyService.getStats(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: () => AdminPropertyService.getCities(),
    staleTime: Infinity,
  });
}

export function usePropertyTypes() {
  return useQuery({
    queryKey: ['propertyTypes'],
    queryFn: () => AdminPropertyService.getPropertyTypes(),
    staleTime: Infinity,
  });
}

export function useStatuses() {
  return useQuery({
    queryKey: ['statuses'],
    queryFn: () => AdminPropertyService.getStatuses(),
    staleTime: Infinity,
  });
}
