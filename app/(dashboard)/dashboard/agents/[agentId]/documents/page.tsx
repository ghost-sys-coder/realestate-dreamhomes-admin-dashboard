import { notFound } from 'next/navigation';
import { getSingleAgent } from '@/actions/agents';
import DocumentUploadForm from '@/components/dashboard/DocumentUploadForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';


const UploadDocumentsPage = async ({ params }: {params: Promise<{agentId: string}>}) => {
  const { agentId } = await params;


  const agent = await getSingleAgent(Number(agentId));

  if (!agent) notFound();

  const fullName = `${agent.firstName} ${agent.lastName}`;

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-8">
      <div className="flex items-center justify-center gap-4 relative">
        <Link href={`/agents/${agentId}`} className='absolute left-2 top-2'>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Agent
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Upload Documents</h1>
          <p className="text-muted-foreground">
            Upload compliance documents for <span className="font-medium">{fullName}</span>
          </p>
        </div>
      </div>

      <DocumentUploadForm agentId={Number(agentId)} />
    </div>
  );
};

export default UploadDocumentsPage;