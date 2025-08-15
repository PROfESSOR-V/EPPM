/**
 * VERY EARLY MOCK — DO NOT USE IN PRODUCTION
 *
 * To respect LinkedIn TOS, prefer their official APIs.
 * If scraping personal profile for demo only:
 *  - Rate limit requests (1/minute)
 *  - Rotate user-agents
 *  - Cache results
 */

export interface ScrapedLinkedInProfile {
  name: string;
  headline: string;
  skills: string[];
  experience: { company: string; title: string; period: string }[];
  jobsInterested: string[];
}

export async function scrapeProfile(
  _url: string,
  _options: { html?: string } = {}
): Promise<ScrapedLinkedInProfile> {
  // For MVP we simply return a mocked profile
  return {
    name: 'John Doe',
    headline: 'Software Engineer @ Example',
    skills: ['TypeScript', 'React', 'Node.js'],
    experience: [
      { company: 'Example', title: 'SE', period: '2022-Present' },
    ],
    jobsInterested: ['Backend Engineer', 'Full Stack Engineer'],
  };

  // TODO: replace with real scraping using cheerio
}
