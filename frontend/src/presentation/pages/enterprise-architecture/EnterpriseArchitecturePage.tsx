import { useState } from 'react';
import { GptMessage, MyMessage, TextMessageBox, TypingLoader, EnterpriseArchitectureResponse } from '../../components';
import { enterpriseArchitectureUseCase } from '../../../core/use-cases';

interface Message {
  roles?: Role[];
  text?: string;
  isGpt: boolean;
}

interface Role {
  name: string;
  title: string;
  'role-description': string;
}

export const EnterpriseArchitecturePage = () => {
  const [ isLoading, setIsLoading ] = useState( false );
  const [ messages, setMessages ] = useState<Message[]>( [] );

  const handlePost = async ( text: string ) => {
    setIsLoading( true );
    setMessages( ( prev ) => [ ...prev, { text: text, isGpt: false } ] );

    const { ok, roles } = await enterpriseArchitectureUseCase( text );
    setIsLoading( false );

    if ( !ok ) return;

    setMessages( ( prev ) => [ ...prev, { roles: roles, isGpt: true } ] );
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Tell me about your project" />
          { messages.map( ( message, index ) =>
            message.isGpt ? (
              message.roles ? (
                <EnterpriseArchitectureResponse key={ index } roles={ message.roles } />
              ) : null
            ) : (
              <MyMessage key={ index } text={ message.text || '' } />
            )
          ) }
          { isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          ) }
        </div>
      </div>
      <TextMessageBox
        onSendMessage={ handlePost }
        placeholder="Type here what you want"
        disableCorrections
      />
    </div>
  );
};
