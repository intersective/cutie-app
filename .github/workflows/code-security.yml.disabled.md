name: "Code Scanning - Action"

on:
  pull_request:
  schedule:
    - cron: '30 1 * * 0'

jobs:
  code-security:
    # CodeQL runs on ubuntu-latest, windows-latest, and macos-latest
    name: code-security
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      # Initializes the CodeQL tools for scanning.
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v1
        # Override language selection by uncommenting this and choosing your languages
        with:
          languages: javascript

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v1


      # Run Slack Notification
      - name: Slack Notification
        if: always() # Pick up events even if the job fails or is canceled.
        uses: 8398a7/action-slack@v3
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          MATRIX_CONTEXT: ${{ toJson(matrix) }} # required
        with:
          status: ${{ job.status }}
          author_name: GitHubAction CI for code security
          mention: 'here'
          if_mention: failure,cancelled
          job_name: code-security
          fields: repo,commit,eventName,ref,workflow,message,author,job,took
          custom_payload: |
            {
            username: 'GitHub Action CI WorkFlow',
            icon_emoji: ':github:',
            attachments: [{
              color: '${{ job.status }}' === 'success' ? 'good' : ${{ job.status }}' === 'failure' ? 'danger' : 'warning',
              text:
             `${process.env.AS_REPO}\n
              ${process.env.AS_COMMIT}\n 
              ${process.env.AS_EVENT_NAME}\n
              @${process.env.AS_REF}\n
              @${process.env.AS_WORKFLOW}\n
              ${process.env.AS_MESSAGE}\n
              ${process.env.AS_AUTHOR}\n
              ${process.env.AS_JOB}\n
              ${process.env.AS_TOOK}`,
            }]
            }
