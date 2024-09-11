interface Role {
  name: string;
  title: string;
  'role-description': string;
}

interface EnterpriseArchitectureResponseProps {
  roles: Role[];
}

export const EnterpriseArchitectureResponse = ( { roles }: EnterpriseArchitectureResponseProps ) => {
  return (
    <div className="enterprise-architecture-response">
      <ul>
        { roles.map( ( role, index ) => (
          <li key={ index } className="role-item">
            <strong>{ role.name }</strong> - <em>{ role.title }</em>: { role[ 'role-description' ] }
          </li>
        ) ) }
      </ul>
    </div>
  );
};
