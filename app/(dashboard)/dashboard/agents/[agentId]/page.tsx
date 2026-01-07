import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AgentProfile from '../_components/AgentProfile'
import AgentDocuments from '../_components/AgentDocuments'
import AgentVerification from '../_components/AgentVerification'
import { getSingleAgent } from '@/actions/agents'

interface AgentDetailsPageProps {
    params: Promise<{ agentId: string[] }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AgentDetailsPage = async ({ params }: AgentDetailsPageProps) => {
    const { agentId } = await params;

    const agent = await getSingleAgent(Number(agentId));

    return (
        <div className='p-4 space-y-6'>
            <h1 className="text-2xl font-semibold">Agent Details</h1>
            <Tabs defaultValue='profile' className='w-full'>
                <TabsList className='w-full'>
                    <TabsTrigger value='profile'>Profile</TabsTrigger>
                    <TabsTrigger value='documents'>Document</TabsTrigger>
                    <TabsTrigger value='verification'>Verification</TabsTrigger>
                </TabsList>
                <TabsContent value='profile'>
                    <AgentProfile agent={agent} />
                </TabsContent>
                <TabsContent value='documents'>
                    <AgentDocuments agentId={Number(agentId)} />
                </TabsContent>
                <TabsContent value='verification'>
                    <AgentVerification status={agent?.status || "draft"} agentId={Number(agentId)} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AgentDetailsPage