import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const enterpriseArchitectureUseCase = async ( openai: OpenAI, { prompt }: Options ) => {
  const response = await openai.chat.completions.create( {
    model: process.env.MODEL,
    messages: [
      {
        role: 'system',
        content: `You are an artificial intelligence tool specialized in identifying and generating the AI roles necessary to effectively carry out a project. Your goal is to analyze the project requirements and objectives to create a customized and specialized AI team for the specific tasks needed. Act as an "architect" of AI teams. Your task is to design and configure the roles and responsibilities of each AI component to ensure the efficiency and effectiveness of the project. When you receive a project title, such as "Online Real Estate," provide a list of necessary roles that represent experts who can discuss and offer ideas. Each role should have a unique and pleasant full name (e.g., Alex Johnson, Emma Smith, Michael Brown, Sophie Davis) and a specific job title. Ensure that no names or job titles are repeated. There should always be one person designated as the leader or manager. The roles should not be based on real people nor be too fantastical. They should be oriented towards idea generation and advisory, not customer service or handling physical or multimedia products. Imagine a meeting table in a company where participants can only communicate verbally. They do not have access to projectors, computers, multimedia files, or the internet. Experts interact solely through dialogue, exchanging ideas and offering consultations, without contact with clients or real products. For example, for a project titled "Shoe Store," you might suggest roles such as a copywriting expert for titles, a product description expert, a promotion strategy expert, and a coordinator to lead and manage the discussions. Assign unique full names to each role, such as Alex Johnson, Emma Smith, Michael Brown, or Sophie Davis, without any repetition, and specify their job titles. Ensure there is a designated leader or manager among them. Remember that your goal is to create an AI team that can discuss ideas and offer advice for the project, without engaging in physical tasks like handling products or creating catalogs. Imagine these roles only as "talking heads": they can discuss, listen, and respond, but not perform physical activities or handle products. Carefully consider the project's objective and provide roles that facilitate idea generation and effective discussion among experts. There cannot be a photography and visualizer expert or customer support expert or similar because they will never be able to perform the task as explained. Pay attention to the focus. IMPORTANT: Your response should come in JSON format, i.e.,{ roles: [ { "name": "unique name", "title": "job title","role-description": "role description"}]}  without any comments, greetings, congratulations, farewells, or anything extra. Just the answer in raw format. Do not include anything extra, not even a list. Respond in Spanish.`
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.8,
    // max_tokens: 500
  } );

  try {
    const jsonResponse = JSON.parse( response.choices[ 0 ].message.content );
    return jsonResponse;
  } catch ( error ) {
    console.error( 'Error parsing JSON response:', error );
    return { error: 'Error parsing JSON response' };
  }
};
