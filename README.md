# files-changed-action
This github action exposes the files and file extensions of the changed files comparing the current branch versus a target branch (default master)
This is helpful if you want to skip certain steps on your workflow depending on the files that have changed, to decrease the execution time of your workflows.

### How to use

Install action and specify id

```
  - name: Get list of changed files
    uses: AvraamMavridis/files-changed-action@v3
    id: changed_files
```

Optionally specify target branch

```
  - name: Get list of changed files
    uses: AvraamMavridis/files-changed-action@v3
    id: changed_files
    with:
      target_branch: staging
```

The action exposes 2 outputs

`steps.changed_files.outputs.CHANGED_FILES`

and

`steps.changed_files.outputs.CHANGED_FILES_EXTENSIONS`

execute your steps based on the files that changed

```
    - name: Get list of changed files
      uses: AvraamMavridis/files-changed-action@v3
      id: changed_files
      with:
        target_branch: staging
    - name: Get extensions of changed files
      if: "contains(steps.changed_files.outputs.CHANGED_FILES_EXTENSIONS, 'js')"
      run: echo JS files changed
```

