// src/components/JobCard.tsx
import { useApp } from '@/lib/app-context';
import { formatDate } from '@/lib/data';
import { MapPin, Briefcase, Clock, ArrowRight, Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Vacancy {
  id: string;
  title: string;
  companyId: string;
  department: string;
  location: string;
  type: string;
  experienceLevel: string;
  experienceYears: string;
  salaryRange: string;
  postedDate: string;
  closingDate: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
  documents: string[];
  featured: boolean;
  company?: {
    id: string;
    name: string;
    shortName: string;
  };
}

export function JobCard({ vacancy, className }: { vacancy: Vacancy; className?: string }) {
  const { navigate } = useApp();
  const company = vacancy.company;

  return (
    <Card
      className={cn(
        'group relative flex cursor-pointer flex-col gap-3 border-border/60 p-5 transition-all hover:shadow-lg hover:border-accent/40',
        className
      )}
      onClick={() => navigate('vacancy-detail', { id: vacancy.id })}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground">
            {company?.shortName}
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">{company?.name}</p>
            <p className="text-xs text-muted-foreground/70">{vacancy.department}</p>
          </div>
        </div>
        {vacancy.featured && (
          <Badge variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Featured
          </Badge>
        )}
      </div>

      <div>
        <h3 className="font-serif text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
          {vacancy.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{vacancy.summary}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="font-normal">
          <MapPin className="mr-1 h-3 w-3" /> {vacancy.location}
        </Badge>
        <Badge variant="secondary" className="font-normal">
          <Briefcase className="mr-1 h-3 w-3" /> {vacancy.type}
        </Badge>
        <Badge variant="secondary" className="font-normal">
          <Clock className="mr-1 h-3 w-3" /> {vacancy.experienceYears}
        </Badge>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3">
        <span className="text-xs text-muted-foreground">
          Closes {formatDate(vacancy.closingDate)}
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-accent transition-transform group-hover:translate-x-0.5">
          View details <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Card>
  );
}