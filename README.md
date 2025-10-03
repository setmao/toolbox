# Toolbox

## Continuous Delivery with Terraform on GCP

This project uses Terraform to describe a static-site deployment on GCP, with a CD workflow implemented in `.github/workflows/terraform-cd.yml`. The pipeline runs on pushes to the `main` branch or when triggered manually via `workflow_dispatch`, executing Terraform init, validate, plan, and apply in order.

### Prerequisites

- Create a GCP project and enable the required APIs.
- Provision a Cloud Storage bucket to store the Terraform state, keeping track of the bucket name and optional prefix.
- Configure a service account for GitHub Actions. Workload Identity Federation is recommended for keyless authentication. Ensure at least the following roles:
  - `roles/storage.admin` for reading and writing the Terraform state bucket.
  - `roles/serviceusage.serviceUsageAdmin` to enable APIs.
  - `roles/storage.objectAdmin` to manage objects in the frontend bucket.
  - Add additional permissions as your resources require.

### GitHub Secrets

Add the following secrets under Settings → Secrets and variables → Actions:

- `GCP_WORKLOAD_IDENTITY_PROVIDER`: the Workload Identity Provider resource name such as `projects/123456789/locations/global/workloadIdentityPools/my-pool/providers/my-provider`.
- `GCP_SERVICE_ACCOUNT_EMAIL`: the email of the authorized service account.

If you prefer using a JSON key, adjust the workflow to use `credentials_json` instead.

### GitHub Variables

Configure these repository variables for Terraform:

- `GCP_PROJECT_ID`: the GCP project ID.
- `FRONTEND_ORIGIN`: the public origin of the frontend (used for CORS / CSRF setup).
- `FRONTEND_BUCKET_NAME`: a globally unique bucket name for the static frontend site.
- `TF_STATE_BUCKET`: the bucket that stores Terraform state.
- (Optional) `TF_STATE_PREFIX`: the state object prefix, defaults to `terraform/state`.

Once everything is configured, pushes to `main` automatically apply the latest Terraform changes.

## Frontend Deployment Workflow

When code inside `src/` changes and is pushed to `main`, `.github/workflows/frontend-deploy.yml` will:

- Install dependencies and build the Next.js project using Bun.
- Run `next export` to generate the static site into `src/out`.
- Authenticate against GCP using the same Workload Identity Federation configuration.
- Sync the exported static assets to the Cloud Storage bucket defined by `FRONTEND_BUCKET_NAME`.

If the project relies on dynamic Next.js features that block `next export`, adjust your application or tweak the workflow build strategy.
