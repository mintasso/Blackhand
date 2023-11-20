export interface ListedUser {
  user_id: string;
  proof: string;
  description: string;
  severity: number;
}

export interface serverSettings {
  guildid: string;
  warn_at: number;
  ban_at: number;
  autoban: boolean;
}
