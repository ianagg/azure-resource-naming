function DocumentsList() {
  return (
    <>
        <p>Here you can find relevant documentation about Azure resource naming.</p>
        <ul>
            <li>
                <a href="https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming" target="_blank" rel="noopener noreferrer">
                    Defining your naming convention
                </a>
            </li>
            <li>
                <a href="https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-abbreviations" target="_blank" rel="noopener noreferrer">
                    Recommended abbreviations for Azure resource types
                </a>
            </li>
            <li>
                <a href="https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/resource-name-rules" target="_blank" rel="noopener noreferrer">
                    Naming rules and restrictions for Azure resources
                </a>
            </li>
            <li>
                <a href="https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/azure-services-resource-providers" target="_blank" rel="noopener noreferrer">
                    Matching resource providers to Azure services
                </a>
            </li>
        </ul>
    </>
  )
}

export default DocumentsList