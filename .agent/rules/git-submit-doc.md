---
trigger: always_on
---

When you complete a task, you should submit it to the git repository.

First, if there isn't a repository, you should create one by running `git init`. And change the branch to `main`.

1. Run `git pull origin main` to pull the code from the remote repository.
2. Run `git add .` to add all the files to the staging area.
3. Run `git commit -m "Your commit message"` to commit the changes. What's the commit message?
  - "${project_name}: ${task_name | actions you have done}". e.g. "code-ascension: Bug fix."
  - **Attention**: If git ask you to tell it your name and email, you should tell it haokee-git and 19173155158@163.com.
4. Run `git push origin main` to push the changes to the remote repository.

If you failed to push code (need password), please tell me. I will set the github token for you. And you can successfully push the code.
