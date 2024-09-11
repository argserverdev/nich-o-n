import type { EnterpriseArchitectureResponse } from '../../interfaces';

export const enterpriseArchitectureUseCase = async ( prompt: string ) => {
  try {
    const resp = await fetch( `${ import.meta.env.VITE_GPT_API }/enterprise-architecture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( { prompt } ),
    } );

    if ( !resp.ok ) throw new Error( 'Failed to generate roles' );

    const data = await resp.json() as EnterpriseArchitectureResponse;

    return {
      ok: true,
      roles: data.roles,
    };
  } catch ( error ) {
    return {
      ok: false,
      roles: [],
    };
  }
};
