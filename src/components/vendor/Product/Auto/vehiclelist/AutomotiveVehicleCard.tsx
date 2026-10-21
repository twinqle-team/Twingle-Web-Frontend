import {  Heart, MapPin } from 'lucide-react';
import { Automotives } from '@/components/vendor/types/Automotives';

type AutomotiveVehicleCardProps = {
  automotive: Automotives;
  onEdit: (automotive: Automotives) => void;
  onDelete: (automotive: Automotives) => void;
};

const statusStyles: Record<Automotives['status'], string> = {
  available: 'bg-[#e5f3eb] text-[#012E19]',
  reserved: 'bg-[#fff4d4] text-[#8a6400]',
  sold: 'bg-gray-100 text-gray-600',
};

export default function AutomotiveVehicleCard({ automotive, onEdit, onDelete }: AutomotiveVehicleCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-[#dce8e0] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#e8f0eb]">
        <img src={automotive.image} alt={automotive.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[automotive.status]}`}>{automotive.status}</span>
        <button type="button" aria-label={`Favorite ${automotive.title}`} className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-[#012E19] shadow-sm hover:bg-[#F2B60A]"><Heart size={16} /></button>
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        <div><p className="text-xs font-bold uppercase tracking-wider text-[#a57900]">{automotive.brand} {automotive.model}</p><h2 className="mt-1 line-clamp-2 text-lg font-bold text-[#012E19]">{automotive.title}</h2></div>
        <div className="flex items-center gap-1 text-sm text-[#60756a]"><MapPin size={15} className="text-[#a57900]" />{automotive.city}, {automotive.state}</div>
        <div className="grid grid-cols-2 gap-2 text-xs text-[#60756a]"><span>{automotive.year} model</span><span>{automotive.mileage.toLocaleString()} {automotive.unit}</span><span className="capitalize">{automotive.transmission}</span><span className="capitalize">{automotive.fueltype}</span></div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#edf2ee] pt-4"><p className="text-xl font-bold text-[#012E19]">${automotive.price.toLocaleString()}</p><div className="flex items-center gap-2"><button type="button" onClick={() => onEdit(automotive)} className="rounded-lg border border-[#dce8e0] px-3 py-2 text-xs font-bold text-[#012E19] hover:border-[#F2B60A] hover:bg-[#fff8df]">Edit</button><button type="button" onClick={() => onDelete(automotive)} className="rounded-lg border border-[#f1d2cd] px-3 py-2 text-xs font-bold text-[#a13c32] hover:bg-[#fbe7e4]">Delete</button></div></div>
      </div>
    </article>
  );
}
