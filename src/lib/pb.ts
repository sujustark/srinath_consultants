import PocketBase from 'pocketbase';

/**
 * Preserves the existing Hostinger Horizons PocketBase backend integration
 * for enquiries, projects, checklist PDFs, and site_settings.
 */
export const pb = new PocketBase('/hcgi/platform');
pb.autoCancellation(false);

