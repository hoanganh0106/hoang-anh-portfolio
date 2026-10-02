import type { DomainId } from './types'
export const domains: Record<DomainId,{id:DomainId;label:string;description:string;href:string;state:'current'|'direction'}> = {
 systems:{id:'systems',label:'Systems',description:'Networking, Linux, Windows Server and infrastructure labs.',href:'/projects?domain=systems',state:'current'},
 'edge-ai':{id:'edge-ai',label:'Edge AI',description:'Models and inference close to the physical device.',href:'/projects?domain=edge-ai',state:'current'},
 research:{id:'research',label:'Research',description:'Signal processing and speech separation experiments.',href:'/research',state:'current'},
 electronics:{id:'electronics',label:'Electronics',description:'Signal processing and embedded systems in practice.',href:'/projects?domain=electronics',state:'current'},
 'ic-design':{id:'ic-design',label:'IC Design',description:'A future direction toward deeper hardware design.',href:'/about#directions',state:'direction'}
}
export const domainIds = Object.keys(domains) as DomainId[]
