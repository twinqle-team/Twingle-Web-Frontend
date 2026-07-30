import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PropertyService } from '@/components/vendor/services/propertyService';
import { FilterState, Property } from '@/components/vendor/types/property';

export function useProperties(filters?: FilterState, page?: number, itemsPerPage?: number) {
  return useQuery({
    queryKey: ['properties', filters, page, itemsPerPage],
    queryFn: () => PropertyService.getProperties(filters, page, itemsPerPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => PropertyService.getProperty(id),
    enabled: !!id,
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => PropertyService.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Property> }) =>
      PropertyService.updateProperty(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => PropertyService.toggleFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function usePropertyStats() {
  return useQuery({
    queryKey: ['propertyStats'],
    queryFn: () => PropertyService.getStats(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: () => PropertyService.getCities(),
    staleTime: Infinity,
  });
}

export function usePropertyTypes() {
  return useQuery({
    queryKey: ['propertyTypes'],
    queryFn: () => PropertyService.getPropertyTypes(),
    staleTime: Infinity,
  });
}

export function useStatuses() {
  return useQuery({
    queryKey: ['statuses'],
    queryFn: () => PropertyService.getStatuses(),
    staleTime: Infinity,
  });
}
