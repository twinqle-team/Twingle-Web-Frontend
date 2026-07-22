import { motion } from "framer-motion";
import { Loader2, Save, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionBarProps {
  onCancel: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  submitting?: boolean;
  savingDraft?: boolean;
  disabled?: boolean;
}

export function ActionBar({
  onCancel,
  onSaveDraft,
  onSubmit,
  submitting,
  savingDraft,
  disabled,
}: ActionBarProps) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="sticky bottom-4 z-30 mt-8"
    >
      <div className="mx-auto flex flex-col-reverse items-stretch gap-2 rounded-2xl border border-border/60 bg-white/80 p-3 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-end sm:gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={submitting || savingDraft}
          className="h-11 rounded-xl border-border hover:border-foreground/40"
        >
          <X className="mr-1.5 h-4 w-4" />
          Cancel
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onSaveDraft}
          disabled={submitting || savingDraft}
          className="h-11 rounded-xl bg-secondary hover:bg-secondary/80"
        >
          {savingDraft ? (
            <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-1.5 h-4 w-4" />
          )}
          Save as Draft
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={submitting || savingDraft || disabled}
          className="group relative h-11 overflow-hidden rounded-xl px-6 text-primary-foreground shadow-[0_10px_30px_-10px_rgba(0,40,245,0.6)] transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
          style={{ background: "var(--gradient-primary)" }}
        >
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
          {submitting ? (
            <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-1.5 h-4 w-4" />
          )}
          Add Property
        </Button>
      </div>
    </motion.div>
  );
}
