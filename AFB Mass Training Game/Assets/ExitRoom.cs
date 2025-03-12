using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ExitRoom : MonoBehaviour
{

    public ShelfClue STINFOPoster;
    public ShelfClue planePoster;
    public ShelfClue stickyNote;
    public ActivateClue bookStack;
    public ShelfClue printer;
    public ShelfClue pentagon;
    public ShelfClue box;
    public CountingTypes counter;

    private bool canExit;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }




    void OnMouseDown()
    {
        canExit = STINFOPoster.getAlrInst() && planePoster.getAlrInst() && stickyNote.getAlrInst() && bookStack.getAlrClk() && printer.getAlrInst() && pentagon.getAlrInst() && box.getAlrInst() && counter.getNumFound() == 7;
        if (canExit)
        {
            SceneManager.LoadScene("Room2");
        }
    }
}
