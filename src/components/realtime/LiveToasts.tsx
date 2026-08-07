'use client';

import { useEffect, useRef } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { getSupabaseBrowser } from '@/lib/supabase/client';
import { useToast } from '@/hooks/useToaster';

interface MessagePayload {
  name?: string;
}

/**
 * Listens for the realtime broadcast emitted by POST /api/messages
 * and shows a live toast to every open visitor.
 */
export function LiveToasts() {
  const { toast } = useToast();
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    const channel = supabase
      .channel('messages')
      .on('broadcast', { event: 'new_message' }, (payload) => {
        const name = (payload.payload as MessagePayload)?.name || 'someone';
        toast(`💬 ${name} just sent a message from the contact form`, 'primary');
      })
      .subscribe();

    channelRef.current = channel;
    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return null;
}
