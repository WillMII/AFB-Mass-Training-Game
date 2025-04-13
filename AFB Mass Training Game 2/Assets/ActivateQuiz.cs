using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ActivateQuiz : MonoBehaviour
{

    public List<CountingTypes4> counters;
    public List<ShelfClue> clues;
    public GameObject quiz;
    private int countersComp;
    private int cluesComp;

    private bool canExitCounters;
    private bool canExitClues;
    private bool canExit;
    // Start is called before the first frame update
    void Start()
    {
        countersComp = counters.Count;
        cluesComp = clues.Count;
    }

    // Update is called once per frame
    void Update()
    {

    }




    void OnMouseDown()
    {
        int j = 0;
        for (int i = 0; i < counters.Count; i++)
        {
            if (counters[i].allFound())
            {
                j++;
            }
        }
        if (j == countersComp)
        {
            canExitCounters = true;
        }
        j = 0;
        for (int i = 0; i < clues.Count; i++)
        {
            if (clues[i].getAlrInst())
            {
                j++;
            }
        }
        if (j == cluesComp)
        {
            canExitClues = true;
        }
        canExit = canExitCounters && canExitClues;
        if (canExit)
        {
            quiz.SetActive(true);
            //SceneManager.LoadScene("No Fear Room 2");
        }
    }
}
