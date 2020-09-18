# files-changed-action
This github action exposes the files and file extensions of the changed files comparing the current branch versus a target branch (default master)

### Example

```
      - name: Get list of changed files
        uses: ./ # Uses an action in the root directory
        id: changed_files
        with:
          target_branch: master
      - name: Get files changed
        run: echo "${{ steps.changed_files.outputs.CHANGED_FILES }}"
      - name: Get extensions of changed files
        run: echo "${{ steps.changed_files.outputs.CHANGED_FILES_EXTENSIONS }}"
      - name: Echo if changed js
        if: "contains(steps.changed_files.outputs.CHANGED_FILES_EXTENSIONS, 'js')"
```

